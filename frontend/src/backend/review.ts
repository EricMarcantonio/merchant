import axios from 'axios';
import { IReview } from '../components/ProductList';

export const GetReviewsByItemId = (id: number) => {

    return axios.request<IReview[]>({
        method: 'get',
        url: `http://127.0.0.1/reviews/${id}`,
    })
        .then((response) => {
            console.log(response.data)
            return response.data;
        })
}

export const AddReview = (itemId: string, reviewData: string, rating: string) => {
    var data = JSON.stringify({
        "itemId": itemId,
        "data": reviewData,
        "rating": rating
      });
      
      
      return axios({
        method: 'post',
        url: 'http://127.0.0.1/reviews/',
        withCredentials: true,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      })
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        return GetReviewsByItemId(response.data.itemId).then((reviews) => {
            return reviews;
        })
      })
}