var json = {
    playerid: "", //cambiar el username por el que esta en la url
    grade: 0,
    disability: {
        id: 0,
        type: ""
    },
    minigames: [],
    intelligenceGames: [
        {
            gameid: 5,
            gamegrade: 0,
            competence: "",
            level: 0,
            location: 0,
            server: {
                status: 0,
                lastdate: "",
                platform: ""
            },
            progres: {
                round: 0,
                errors: 0,
                repeatedGuide: 0,
                total: 0,
                finished: false
            },
            next: "",
            isUnlock: false,    
        }
    ],
    locationspritedata: [],
    avatar: {
        name: "",
        type: 0,
        gender: 0,
        skin: 0,
        proffesion: 0
    }
}