export declare global {
  namespace API {
    type User = {
      name: string
      avatarUrl: string
    }

    type Participant = {
      id: string
      user: {
        name: string
        avatarUrl: string
      }
    }

    type Pool = {
      id: string
      code: string
      title: string
      participants: Participant[]
      owner: {
        name: string
      }
    }

    type Guess = {
      id: string
      firstTeamPoints: number
      secondTeamPoints: number
    }

    type Game = {
      id: string
      date: string
      formattedDate: string
      firstTeamCountryCode: string
      secondTeamCountryCode: string
      guess: Guess | null
    }
  }
}
