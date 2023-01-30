import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import { firestoreDB } from '../../service/firebase';
import { DeletedCard } from '../loader/loader';
import { CardSpinner } from '../loader/loader';
import './mycards.css';


const Mycards = (props) => {

    const [cardsObtained, setCardsObtained] = useState([]);
    const [deletCard, setDeletedCard] = useState(false);


    const userCards = async () => {
        if (props.userData.uid !== null) {
            const userCards = await query(collection(firestoreDB, 'cards'), where('uid', '==', props.userData.uid));
            await getDocs(userCards)
                .then(res => {
                    const cards = res.docs.map(doc => {
                        return { id: doc.id, ...doc.data() }
                    })
                    setCardsObtained(cards);
                })
        } else {
            console.log("please log in");
        }
    }

    userCards();

    const deleteCard = async (props) => {

        setTimeout(() => {
            setDeletedCard(false);
        }, 2000)

        const idCard = props;
        await deleteDoc(doc(firestoreDB, 'cards', idCard));
        userCards();

    }


    if (cardsObtained.length === 0) {

        return (
            <div className='mycards-spinner'>
                <h1>you have no cards in your deck</h1>
                <CardSpinner />
            </div>
        )

    } else {

        if (props.userData.uid !== null) { //props.userData.uid

            return (

                <div className='mycards'>
                    <div className='mycards-container'>
                        {cardsObtained.map(c => <div key={c.id} className='forcard'>
                            <button id="deleteCard" onClick={() => deleteCard(c.id, setDeletedCard(true))}>X</button>
                            <img src={c.image} alt=""></img>
                            <p>{c.name}</p>
                        </div>)}
                        {deletCard ? <DeletedCard /> : null}
                    </div>
                </div>

            )
        } else {
            return (
                <div className='mycards-spinner'>
                    <h1>please register or log in if you already have an account</h1>
                    <CardSpinner />
                </div>
            )
        }

    }

}

export default Mycards;