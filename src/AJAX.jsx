'use strict'

// Assume data is sent and responses come back as JSON
// Both are wrappers for built-in async function fetch
// Checks response.status (using response.ok) 

// send a get request
async function sendGetRequest(url) {
  let params = {
    method: 'GET', 
     };
  
  let response = await fetch(url,params);
	console.log(response)
  if (response.ok) {
    let data = await response.json();
		
    return data;
  } else {
    throw Error(response.status);
  }
}

// send a POST request with data = [month,date]
async function sendPostRequest(url,data) {
	const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  });
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    throw Error(response.status);
  }
}

export {sendGetRequest, sendPostRequest};