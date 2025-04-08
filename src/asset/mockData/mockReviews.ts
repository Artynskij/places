import { mockTourist } from "./mockTourist";

export const mockReviews = [
  {
    user: mockTourist[0],
    review: {
      title: "Неплохой отель",
      description:
        "Не скажу что топчик но скажу что неплохое обслуживание на уровне и плюс расположение удобное. В общем и целом одобряю. Не скажу что топчик но скажу что неплохое обслуживание на уровне и плюс расположение удобное. В общем и целом одобряю. Не скажу что топчик но скажу что неплохое обслуживание на уровне и плюс расположение удобное. В общем и целом одобряю. Не скажу что топчик но скажу что неплохое обслуживание на уровне и плюс расположение удобное. В общем и целом одобряю. Не скажу что топчик но скажу что неплохое обслуживание на уровне и плюс расположение удобное. В общем и целом одобряю.",
      dateReview: "11.03.2025",
      rating: {
        rate: 3,
        additional: {
          Rooms: 3,
          Service: 4,
          PriceQuality: 5,
          Clean: 4,
          Location: 2,
          Sleep: 3,
        },
      },
      dateVisit: "февраль 2025",
      album: [
        "/mock/mockObjErevan-1.jpg",
        "/mock/mockObjErevan-2.jpg",
        "/mock/mockObjErevan-3.jpg",
        "/mock/mockObjErevan-4.jpg",
        "/mock/mockObjErevan-5.jpg",
      ],
    },
    establishmentId: "01JJ221DA8Y9D38SMWY3E91411",
  },
  {
    user: mockTourist[0],
    review: {
      title: "Топовый отель",
      description:
        "Не скажу что топчик но скажу что неплохое обслуживание на уровне и плюс расположение удобное. В общем и целом одобряю.",
      dateReview: "11.03.2025",
      rating: {
        rate: 5,
        additional: {},
      },
      dateVisit: "февраль 2025",
      album: null,
    },
    establishmentId: "01JJ221DFMSB52QJ7T3SJDT5TB",
  },
  {
    user: mockTourist[0],
    review: {
      title: "Топовый отель",
      description:
        "Не скажу что топчик но скажу что неплохое обслуживание на уровне и плюс расположение удобное. В общем и целом одобряю.",
      dateReview: "11.03.2025",
      rating: {
        rate: 4,
        additional: {
          Rooms: 3,
          Service: 4,
          PriceQuality: 5,
          Clean: 4,
          Location: 2,
          Sleep: 3,
        },
      },
      dateVisit: "февраль 2025",
      album: null,
    },
    establishmentId: "01JJ221DJARES4ATVV9G6Y2GNT",
  },
];
