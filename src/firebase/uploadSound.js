import firebase from 'firebase'

import config from './config'

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

const storageRef = firebase.storage().ref()
/**
 * soundUpload
 * @function
 * @param {file} file 
 * @param {string} directoryName 
 * @param {string} fileName 
 * @param {firebaseUploadCallback} callback 
 * @returns {firebaseUploadCallback}
 */
export const soundUpload = (file, directoryName, fileName, callback) => {

    let fname = fileName + Date.now().toString()

    let metadata = {
        contentType: file.type
    }

    storageRef.child('recordapp' + '/' + directoryName + '/' + fname)
        .put(file, metadata).then((snapshot) => {
            console.log('uploaded snapshot ', snapshot)

            return callback(snapshot, false, null)
        }).catch((error) => {

            return callback(null, true, error)
        })

}

/**
 * firebaseUploadCallback
 * @callback firebaseUploadCallback 
 * @param {snapshot} snapshot
 * @param {boolean} error
 * @param {object} message
 */