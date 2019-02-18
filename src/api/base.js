import axios from 'axios';

class Base {
  constructor() {

  }

  /**
   * 
   */
  request(param) {
    let url = 'api/'+ param.url;
    if(!param.type){
      param.type = "POST";
    }
    if(!param.contentType){
      param.contentType = true;
    }
    if(!param.processData){
      param.processData = true;
    }
    return axios({
      method: param.type,
      url: url,
      data: param.data,
      processData: param.processData,
      contentType: param.contentType
    })
  }
}

export { Base };
