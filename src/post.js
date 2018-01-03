'use strict'

function Post(client, data = {}) {
  this.client = client;
  this.id = data.id;
  this.slug = data.slug;
  this.appearance = data.appearance;
  this.language = data.language;
  this.rtl = data.rtl;
  this.createdAt = new Date(data.created);
  this.title = data.title;
  this.body = data.body;
  this.tags = data.tags;
  this.views = data.views;
};

Post.prototype.getPost = function(id) {
  return this.client._request('get', '/posts/'+id).then( (p) => {
    p = JSON.parse(p);
    if(p.code === 200) {
      return new Post(this.client, p.data);
    } else {
      console.log('Something went wrong in post.js: ', p);
    }
  }).catch((error) => {
    console.log('Something went wrong in post.js: ', error);
  });
};

Post.prototype.createPost = function(body, { title, font, lang, rtl, crosspost } = {}) {
  let data = { body, title, font, lang, rtl, crosspost };
  if(this.client.accessToken) data.Authorization = 'Token ' + this.client.accessToken;
  console.log(data);
  return this.client._request('post', '/posts', data).then((p) => {
    p = JSON.parse(p);
    if(p.code === 201) {
      return p;
    } else {
      console.log('Something went wrong in post.js: ', p);
    }
  }).catch((error) => {
    console.log('Something went wrong in post.js: ', error);
  });
};

Post.prototype.unpublish = function(id) {
  return this.client._request('delete', '/posts/'+id+"token="+this.client.accessToken ).then((p) => { console.log(p) }).then((p) => {
    p = JSON.parse(p);
    if(p.code === 204) {
      return new Post(this.client, p.data);
    } else {
      console.log('Something went wrong in post.js: ', p);
    }
  }).catch((error) => {
    console.log('Something went wrong in post.js: ', error);
  });
};

module.exports = Post;
