import { fetchStorageImages } from "../utility/saveToStorage";

interface NewImage {
  task_id: string;
  prompt: string;
  uri?: string;
}

interface AddImage {
  id: string;
  uri: string
}

export const generateNewImage = (payload: NewImage) => {
  return {
    type: 'GENERATE_NEW_IMAGE',
    payload
  }
}

export const addImage = (payload: AddImage) => {
  return {
    type: 'ADD_IMAGE',
    payload
  }
}

export const fetchImagesInStorage = async (dispatch) => {
  try {
    const images = await fetchStorageImages(); 
    dispatch({
      type: 'FETCH_IMAGES_IN_STORAGE',
      payload: images,
    });
  } catch (error) {
    // Handle any errors and dispatch an error action if needed
    console.log('error fetching data from storage', error)
  }
};





