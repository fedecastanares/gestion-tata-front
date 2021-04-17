import {axiosApiInstance} from './instance';

export const getGamesRequest = async () => {
    try {
        const response = await axiosApiInstance.get(`/games`)
        const allGames = response.data.mygames.concat(response.data.pendingGames);
        return ({
            games: allGames.sort((a,b) => a.updatedAt > b.updatedAt), 
            id: response.data.playerId
        });
    } catch (error) {
        console.log(error);
    }
}

export const responseGame = async (id, rivalPlay) => {
    const data = {
        "rivalPlay": rivalPlay,
        "status" : "completed",
    }
    try {
        const response = await axiosApiInstance.post(`/games/${id}`, data)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
