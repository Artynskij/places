import { IPersonEntity } from "@/lib/models/api/entities/(person)/person.entity";
import { IPersonFront } from "@/lib/models/frontend/(person)/person.front";
import { IPersonSettingsFront } from "@/lib/models/frontend/(person)/personSettings.front";
import { ISocialContactsFront } from "@/lib/models/frontend/(person)/socialContacts.front";

export class PersonMapper {
    constructor() {}

    transformPersonEntity(
        personDataServer: IPersonEntity,
        cdnHost: string | null
    ): IPersonFront {
        const avatarImage =
            cdnHost && personDataServer.person.AvatarPhotoPath
                ? `${cdnHost}${personDataServer.person.AvatarPhotoPath}`
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
        const contacts = personDataServer.person.Contacts
            ? {
                  id: personDataServer.person.Contacts.Id,
                  phone: personDataServer.person.Contacts.Phone,
                  email: personDataServer.person.Contacts.Email,
              }
            : null;
        const socialNetworks: ISocialContactsFront | null = personDataServer
            .person.Contacts?.SocialContacts
            ? {
                  id: personDataServer.person.Contacts.SocialContacts.Id,
                  instagram:
                      personDataServer.person.Contacts.SocialContacts.Instagram,
                  linkedin:
                      personDataServer.person.Contacts.SocialContacts.LinkedIn,
                  ok: personDataServer.person.Contacts.SocialContacts.OK,
                  rutube: personDataServer.person.Contacts.SocialContacts
                      .RuTube,
                  telegram:
                      personDataServer.person.Contacts.SocialContacts.Telegram,
                  threads:
                      personDataServer.person.Contacts.SocialContacts.Threads,
                  tiktok: personDataServer.person.Contacts.SocialContacts
                      .TikTok,
                  viber: personDataServer.person.Contacts.SocialContacts.Viber,
                  web: personDataServer.person.Contacts.SocialContacts.Web,
                  vk: personDataServer.person.Contacts.SocialContacts.VK,
                  whatsapp:
                      personDataServer.person.Contacts.SocialContacts.WhatsApp,
                  x: personDataServer.person.Contacts.SocialContacts.X,
                  youtube:
                      personDataServer.person.Contacts.SocialContacts.YouTube,
              }
            : null;
        const personName = personDataServer.person.PersonName
            ? {
                  id: personDataServer.person.PersonName.Id,
                  name: personDataServer.person.PersonName.FirstName,
                  secondName: personDataServer.person.PersonName.MiddleName,
                  surname: personDataServer.person.PersonName.LastName,
                  originalLastName:
                      personDataServer.person.PersonName.OriginalLastName,
                  originalName: personDataServer.person.PersonName.OriginalName,
              }
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
            avatarImg: avatarImage,
            birthDate: personDataServer.person.BirthDate,
            timeZone: personDataServer.person.TZ,
            address: address,
            contacts: contacts,
            socialNetworks: socialNetworks,
            personName: personName,
            personSettings: personSettings,
        };

        return mappedData;
    }
}
