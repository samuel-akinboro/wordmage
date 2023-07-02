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