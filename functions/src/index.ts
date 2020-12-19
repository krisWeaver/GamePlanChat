//import { firestore } from 'firebase-admin';
//import { allowedNodeEnvironmentFlags } from 'process';

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'; 

admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript


export const updateCommentsCount = functions.firestore.document('comments/{commentId}').onCreate(async (event) => {

   let data = event.data();
   let postId = data.post; 
   let doc = await admin.firestore().collection("posts").doc(postId).get();

   console.log(doc.get('commentsCount'));

   if (doc.exists) {

      let commentsCount = doc.get('commentsCount') || 0; 
      
      commentsCount = commentsCount + 1; 
      
      await admin.firestore().collection('posts').doc(postId).update({
         "commentsCount" : commentsCount
      })
      
      return true

   } else {

      return false; 
      
   }

    
});

