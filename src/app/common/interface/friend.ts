export interface Friend{
    numberOfFriends: number,
    numberOfFollow: number,
    friends: {
        avatar: string,
        name: string,
        commonFriend: number,
    },
}