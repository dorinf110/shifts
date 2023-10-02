import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceFirestoreService {

  constructor(private firestore:AngularFirestore) { }

  getUsers(){
    return this.firestore.collection('users').snapshotChanges();
  } 

  saveUser(user:User){
    this.firestore.collection('users').add(user).then(document=>{
      // console.log("user added:", document);
    }).catch(error=>{
      console.log(error);
    });
  }

  updateUser(id:string, user:any, collection:string){
    const document = this.firestore.collection(collection).doc(id);
    document.update(user).then(data=>{
      console.log("User updated!",data);
    }).catch(error=>{
      console.log(error);
    });
  }

  deleteUser(id:string, collection:string){
    const document= this.firestore.collection(collection).doc(id);
    document.delete().catch(error=>{
      console.log(error);
  })}}
