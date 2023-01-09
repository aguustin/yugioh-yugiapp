import './allcards.css';
import LoadingSpinner from '../loader/loader';
import { useEffect, useState } from 'react';


const Allcards = () => {

    const [AllCards, setAllCards] = useState([]);
    const [card, setCard] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [x, setX] = useState(0);
    const [y, setY] = useState(20);
   
    useEffect(() => {
        fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
        .then((res) => res.json())
        .then((data) => {
                const e = data.data;
                setAllCards(e);
        });
        
    }, []);

    const allPages = (AllCards.length / 20); //tengo el numero de pag

    const previous = () => {

        if(currentPage === 1 || currentPage < 1){

            setCurrentPage(1);

        }else{

            setCurrentPage(currentPage - 1);

            setX(x - 20);
            setY(y - 20);

        }
        
    }

    const next = () => {

        if(currentPage === allPages.length){

            setCurrentPage(currentPage + 0)

        }else{

            setCurrentPage(currentPage + 1);

            setX(x + 20);
            setY(y + 20);
            
        }

    }

     const limit = AllCards.slice(x, y);
    
    const Pages = () => {
       
        return(
            <div><button>1 2 3 4</button></div>
        )
    }

    const [detail, setDetail] = useState(false);

    const Detail = (props) => {
        
            const getCard = props;

            fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${getCard}`)
            .then((res) => res.json())
            .then((data) => {
                const e = [data.data[0]];
                setCard(e);
            })
            
                return(
                    <div className='cardDetail'>
                    <button onClick={()=> setDetail(false)}>X</button>
                            {card.map((c) => <div className='cardDetailContainer' key={c.id}>
                            <div><img src={c.card_images[0].image_url} alt=""></img></div>
                            <div>
                            <h2>{c.name}</h2>
                            <p>Id card: {c.id} </p>
                            <p>Type: {c.type}</p>
                            <p>Race: <b>{c.race}</b></p>
                            <p>{c.desc}</p>
                            </div>
                        </div>)}
                    </div>
                )
            

        
    }
 
    if(limit.length === 0){
        return(
            <div className='allcards mx-auto'>
                 <LoadingSpinner></LoadingSpinner>
            </div>
        )
        
    }else{

    return(
        <div className='allcards'>
              <div className='cards-container'>
              {detail ? <Detail/> : null}
               {limit.map(l => <div className='cards mx-auto' key={l.id}>
                    <button onClick={() => Detail(l.id, setDetail(true))}><img src={l.card_images[0].image_url} alt=""></img></button>
                    <p>{l.name}</p>
                </div>)}
            </div>
            <div className='pages mx-auto'>
                    <button onClick={() => previous()}>Previous</button>
                    <p>{currentPage}</p>
                    <button onClick={() => next()}>Next</button>
            </div>
                <Pages/>
        </div>
    )
    
    }
    
}


export default Allcards;

