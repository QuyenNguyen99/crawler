// import { CustomerInfo } from './customerinfo';
// import { FacebookInfo } from './facebookinfo';
// import { AddressInfo } from './addressinfo';
// import { School } from './school';
// import { Influence } from './influence';
// import { Friend } from './friend';
// import { Group } from './group';
// import { Post } from './post';
// import { Company } from './company';

export interface FacebookProfile {
    // commonInfo: {
    //     customerInfo: CustomerInfo,
    //     facebookInfo: FacebookInfo,
    //     addressInfo: AddressInfo[],
    //     companies: Company[],
    //     educations: School[],
    //     influence: Influence,
    //     viewpoint: string,
    // }
    // friends: {
    //     numberOfFriends: number,
    //     numberOfFollow: number,
    //     friends: Friend[],
    // }
    // group: {
    //     numberOfGroup: number,
    //     groupinfo: Group[],
    // }
    // post: {
    //     numberOfPost: number,
    //     postContent: Post[],
    // }
    commonInfo: {
        customerInfo: {
            name: string,
            dob: string,
            amoutOfAge: {
                min: number,
                max: number,
            };
            gender: string,
            marriage: string,
            telephoneNumber: string,
            email: string,
        },
        facebookInfo: {
            fbID: string,
            fbkLink: string,
            fbUser: string,
        }
    }
}