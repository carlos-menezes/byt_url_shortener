import firebase from '../utils/firebase';
import crypto from 'crypto';

const firestore = firebase.firestore().collection('urls');

export default class FirebaseService {
  static findById = async (id: string) => {
    const data = await firestore.where('id', '==', id).get();
    if (data.empty) {
      return false;
    }

    return true;
  }

  static findByURL = async (url: string) => {
    const data = await firestore.where('url', '==', url).get();
    if (data.empty) {
      return false;
    }
    return true;
  }

  static getURLById = async (id: string) => {
    const data = await firestore.where('id', '==', id).get();
    const doc = data.docs[0];
    return doc.data()['url'];
  }
  
  static pushData = async (url: string) => {
    const existingRecord = await FirebaseService.findByURL(url);
    if (!existingRecord) { // If there's no record for this URL
      const id = crypto.randomBytes(3).toString('hex');
      firestore.add({
        url,
        id,
        hits: 1
      });
      
      return id.toString();
    } else {
      const data = await firestore.where('url', '==', url).get();
      const doc = data.docs[0];
      firestore.doc(doc.id).update({
        hits: doc.data()['hits'] + 1
      })
      return doc.data()['id']
    }
  }
}