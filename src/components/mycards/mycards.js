import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import {  useState } from 'react';
import { firestoreDB } from '../../service/firebase';
import { DeletedCard } from '../loader/loader';
import { CardSpinner } from '../loader/loader';
import './mycards.css';


const Mycards = (props) => {

    const [cardsObtained, setCardsObtained] = useState([]);
    const [deletCard, setDeletedCard] = useState(false);

    const userrCards = async () => {
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
            console.log("no hay user");
        }
    }

    userrCards();

    const deleteCard = async (props) => {

        setDeletedCard(!deletCard);

        const idCard = props;

        await deleteDoc(doc(firestoreDB, 'cards', idCard));

        // userrCards();

        window.location.reload()

    }


    if (cardsObtained.length === 0) {

        return (
            <div className='mycards-spinner'>
                <h1>You dont have any cart in you maze</h1>
                <CardSpinner />
            </div>
        )

    } else {

        if (props.userData.uid !== null) {

            return (

                <div className='mycards'>
                    <div className='mycards-container'>
                        {cardsObtained.map(c => <div key={c.id} className='forcard'>
                            <button id="deleteCard" onClick={() => deleteCard(c.id)}>X</button>
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
                    <h1>Please register an account or enter if you have one</h1>
                    <CardSpinner />
                </div>
            )
        }

    }

}

export default Mycards;