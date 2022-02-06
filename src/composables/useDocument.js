import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useDocument = (collection, id) => {

  const isPending = ref(false)
  const error = ref(null)

  // register the firestore collection reference
  let docRef = projectFirestore.collection(collection).doc(id)

  const deleteDoc = async () => {
		isPending.value = true
		error.value = null

		try{
			const res = await docRef.delete()
			isPending.value = false
			return res
		} catch(err) {
			console.log(err.message)
			isPending.value = false
			error.value = 'could not delete document'
		}
	}

  return { error, document, deleteDoc }

}

export default useDocument