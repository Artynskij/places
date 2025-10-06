import { IGenderWithContentEntity } from "@/lib/models/server/entities/(person)/gender.entity";
import { IPersonWithContentEntity } from "@/lib/models/server/entities/(person)/person.entity";
import { IGenderFront } from "@/lib/models/frontend/(person)/gender.front";
import { IPersonFront } from "@/lib/models/frontend/(person)/person.front";
import { IPersonSettingsFront } from "@/lib/models/frontend/(person)/personSettings.front";
import { ISocialContactsFront } from "@/lib/models/frontend/socialContacts.front";
import { PersonNameMapper } from "../personName.api";

export class PersonMapper {
    private personNameMapper: PersonNameMapper;
    constructor() {
        this.personNameMapper = new PersonNameMapper();
    }

    toFront(
        personDataServer: IPersonWithContentEntity,
        genderFront: IGenderFront | null,
        cdnHost: string | null
    ): IPersonFront {
        const touristImage =
            cdnHost && personDataServer.person.AvatarPhotoPath
                ? `${cdnHost}${personDataServer.person.AvatarPhotoPath}`
                : null;
        const profileImage =
            cdnHost && personDataServer.person.ProfilePhotoPath
                ? `${cdnHost}${personDataServer.person.ProfilePhotoPath}`
                : null;
        const ownerImage =
            cdnHost && personDataServer.person.Avatar2BPhotoPath
                ? `${cdnHost}${personDataServer.person.Avatar2BPhotoPath}`
                : null;
        const address = personDataServer.person.Contacts?.Address
            ? {
                  id: personDataServer.person.Contacts.Address.Id,
                  country:
                      personDataServer.person.Contacts.Address.Country || null,
                  district:
                      personDataServer.person.Contacts.Address.District || null,
                  town: personDataServer.person.Contacts.Address.Town || null,
                  street:
                      personDataServer.person.Contacts.Address.Street || null,
                  postalCode:
                      personDataServer.person.Contacts.Address.PostalCode ||
                      null,
              }
            : null;
        const socialNetworks: ISocialContactsFront | null = personDataServer
            .person.Contacts?.SocialContacts
            ? {
                  id: personDataServer.person.Contacts.SocialContacts.Id,
                  Instagram:
                      personDataServer.person.Contacts.SocialContacts.Instagram,
                  LinkedIn:
                      personDataServer.person.Contacts.SocialContacts.LinkedIn,
                  OK: personDataServer.person.Contacts.SocialContacts.OK,
                  RuTube: personDataServer.person.Contacts.SocialContacts
                      .RuTube,
                  Telegram:
                      personDataServer.person.Contacts.SocialContacts.Telegram,
                  Threads:
                      personDataServer.person.Contacts.SocialContacts.Threads,
                  TikTok: personDataServer.person.Contacts.SocialContacts
                      .TikTok,
                  Viber: personDataServer.person.Contacts.SocialContacts.Viber,
                  Web: personDataServer.person.Contacts.SocialContacts.Web,
                  VK: personDataServer.person.Contacts.SocialContacts.VK,
                  WhatsApp:
                      personDataServer.person.Contacts.SocialContacts.WhatsApp,
                  X: personDataServer.person.Contacts.SocialContacts.X,
                  YouTube:
                      personDataServer.person.Contacts.SocialContacts.YouTube,
              }
            : null;
        const contacts = personDataServer.person.Contacts
            ? {
                  id: personDataServer.person.Contacts.Id,
                  phone: personDataServer.person.Contacts.Phone,
                  email: personDataServer.person.Contacts.Email,
                  address: address,
                  socialNetworks: socialNetworks,
              }
            : null;

        const personName = personDataServer.person.PersonName
            ? this.personNameMapper.toFront(personDataServer.person.PersonName)
            : null;
        const personSettings: IPersonSettingsFront | null = personDataServer
            .person.PersonSettings
            ? {
                  id: personDataServer.person.PersonSettings.Id,
                  notifyContentModeration:
                      personDataServer.person.PersonSettings
                          .NotifyContentModeration,
                  notifyPartnerOffers:
                      personDataServer.person.PersonSettings
                          .NotifyPartnerOffers,
                  notifyNewPlaces:
                      personDataServer.person.PersonSettings.NotifyNewPlaces,
                  notifyPersonalRecommendations:
                      personDataServer.person.PersonSettings
                          .NotifyPersonalRecommendations,
                  notifyReviewModeration:
                      personDataServer.person.PersonSettings
                          .NotifyReviewModeration,
                  notifyServiceUpdates:
                      personDataServer.person.PersonSettings
                          .NotifyServiceUpdates,
                  showPhotoAlbums:
                      personDataServer.person.PersonSettings.ShowPhotoAlbums,
                  showPosts: personDataServer.person.PersonSettings.ShowPosts,
                  showRatingsAndReviews:
                      personDataServer.person.PersonSettings
                          .ShowRatingsAndReviews,
                  showTravelMap:
                      personDataServer.person.PersonSettings.ShowTravelMap,
                  showVideos: personDataServer.person.PersonSettings.ShowVideos,
              }
            : null;

        const mappedData: IPersonFront = {
            id: personDataServer.person.Id,
            nickname: personDataServer.person.Nickname,
            isVerified: personDataServer.person.IsVerified,
            aboutDescription: personDataServer.person.About,
            dateRegister: personDataServer.person.CreatedDate,
            avatar: {
                touristImageSrc: touristImage,
                ownerImageSrc: ownerImage,
                profileImageSrc: profileImage,
            },

            birthDate: personDataServer.person.BirthDate,
            timeZone: personDataServer.person.TZ,

            contacts: contacts,
            gender: genderFront,
            personName: personName,
            personSettings: personSettings,
        };

        return mappedData;
    }
}
