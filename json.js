import fetch from "node-fetch";

async function main(){
  const postResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
  const postJson = await postResponse.json();

  const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
  const commnetsJson = await commentsResponse.json();

  //Concatenate comments
  const commentsPosts={}
  commnetsJson.forEach((comment)=>{
    if(commentsPosts[ comment.postId ]){
      commentsPosts[ comment.postId ] = commentsPosts[ comment.postId ] + " | " + comment.body
    }else{
      commentsPosts[ comment.postId ] = comment.body
    }
  });

  const postsWithComments=[]
  postJson.forEach((post)=>{
    let comments = {comments: commentsPosts[ post.id ]};
    postsWithComments.push({...post, ...comments})
  })

  return postsWithComments;
}

function generateCsv(posts){
  const csv=posts.map((post)=>{
    return `${post.userId},${post.id},${post.title},${post.body},${post.comments}`
  })

  return csv;
}


async function init(){
  const posts = await main();
  console.log(posts);

  const csv = generateCsv(posts);
  console.log(csv);
}

init();