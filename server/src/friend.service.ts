import { ObjectId } from "mongodb";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Friend, FriendDocument } from "./friend.schema";

@Injectable()
export class FriendService {
  constructor(
    @InjectModel(Friend.name) private friendModel: Model<FriendDocument>,
  ) {}

  async addFriend(addFriendData: any): Promise<any> {
    const { sentByUserId, sentToUserId } = addFriendData;
    const sentByUserObjectId = new ObjectId(sentByUserId);
    const sentToUserObjectId = new ObjectId(sentToUserId);
    const duplicateFriend1 = await this.friendModel
      .findOne({
        $and: [
          { userId: sentToUserObjectId },
          { addedByUserId: sentByUserObjectId },
          { isFriend: true },
        ],
      })
      .lean();
    const duplicateFriend2 = await this.friendModel
      .findOne({
        $and: [
          { userId: sentByUserObjectId },
          { addedByUserId: sentToUserObjectId },
          { isFriend: true },
        ],
      })
      .lean();
    if (duplicateFriend1 || duplicateFriend2) {
      throw new BadRequestException("Already a Friend.");
    } else {
      const newFriend = new this.friendModel({
        userId: sentToUserObjectId,
        addedByUserId: sentByUserObjectId,
        isFriend: true,
      });
      await newFriend.save();
      return newFriend?._doc ? newFriend?._doc : newFriend;
    }
  }

  async getAllFriends(getAllFriendsData: any): Promise<any> {
    const { userId } = getAllFriendsData;
    const userObjectId = new ObjectId(userId);
    const friends = await this.friendModel.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: ["$isFriend", true] },
              {
                $or: [
                  { $eq: ["$userId", userObjectId] },
                  { $eq: ["$addedByUserId", userObjectId] },
                ],
              },
            ],
          },
        },
      },
      {
        $lookup: {
          from: "users",
          let: { userId: "$userId", addedByUserId: "$addedByUserId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $or: [
                        { $eq: ["$_id", "$$userId"] },
                        { $eq: ["$_id", "$$addedByUserId"] },
                      ],
                    },
                    {
                      $not: [{ $eq: ["$_id", userObjectId] }],
                    },
                  ],
                },
              },
            },
            {
              $project: {
                _id: "$_id",
                __v: "$__v",
                name: "$name",
                email: "$email",
                email_verified: "$email_verified",
                picture: "$picture",
                given_name: "$given_name",
                family_name: "$family_name",
                locale: "$locale",
              },
            },
          ],
          as: "friendDetails",
        },
      },
      {
        $unwind: {
          path: "$friendDetails",
        },
      },
      { $project: { userId: false, addedByUserId: false } },
      // { $replaceRoot: { newRoot: "$receivedByUser" } },
    ]);
    return friends;
  }
}
