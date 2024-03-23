import { useState } from 'react'
import './App.css'
import Seen from './components/Seen';

const ACCESS_KEY = import.meta.env.MY_ACCESS_KEY;

function App() {
  const [currentImage, setCurrentImage] = useState(null);
  const [seenCats, setSeenCats] = useState([]);
  const [breed, setBreed] = useState('');
  const [life_span, setLifeSpan] = useState('');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [banList, setBanList] = useState([]);
  const [breed_Info, setBreedInfo] = useState(null);

  const callAPI = async () => {
    const response = await fetch(`https://api.thedogapi.com/v1/images/search?has_breeds=1&api_key${ACCESS_KEY}`);
    const json = await response.json();

    const id = json[0].id;

    const data = await fetch(`https://api.thedogapi.com/v1/images/${id}`);
    const breedInfo = await data.json();
    console.log(breedInfo);

    const group = breedInfo.breeds[0].breed_group;
    const life = breedInfo.breeds[0].life_span;
    const name = breedInfo.breeds[0].name;
    const weight = breedInfo.breeds[0].weight.imperial;
    const cat = {url :json[0].url, name};


    if (banList.includes(group) || banList.includes(life) || banList.includes(weight)){
      console.log("at least one of the values is banned!!");
      callAPI().catch(console.error);
    }else{
      setCurrentImage(json[0].url);
      // setSeenCats((images) => [...images, json[0].url]);
      setSeenCats((images) => [...images, cat]);
      setBreed(group);
      setLifeSpan(life);
      setName(name);
      setWeight(weight);
      setBreedInfo(breedInfo);
    }
  }

  const onSubmit = () =>{
    callAPI().catch(console.error);
  }

  const onBanGroup = () =>{
    if ( breed != "") {
      const updatedLst = [...banList, breed];
      setBanList(updatedLst);
    }
    console.log(banList);
  }
  const onBanWeight = () =>{
    if ( weight != "") {
      const updatedLst = [...banList, weight];
      setBanList(updatedLst);
    }
    console.log(banList);
  }
  const onBanSpan = () =>{
    if ( life_span != "") {
      const updatedLst = [...banList, life_span];
      setBanList(updatedLst);
    }
    console.log(banList);
  }

  return (
    <div>
      <div className='seen'>
        <Seen 
        images={seenCats}/>
      </div>
      <div className='discover'>
        <h1>Trippin' on Cats</h1>
        <h3>Discover cats from your wildest dreams!!</h3>
        <div className="display">
          <div>
            <h2 className="cat_name">{name}</h2>
            <button className="info breed_group" onClick={onBanGroup}>{breed}</button>
            <button className="info weight" onClick={onBanWeight}>{weight}lbs</button>
            {/* <button className="info country" onClick={onBan}>{origin}</button> */}
            <button className="info life_span" onClick={onBanSpan}>{life_span}years</button><br/>
            <img className="image" src={currentImage} width={200} height={200}/>
            </div>
            <br/>
            <button className="discover-btn" onClick={onSubmit}>🔀Discover</button>
        </div>
      </div>
      <div className='ban'>
        <h2>Ban List</h2>
        <h3>Select an attribute in your listing to ban it</h3>
        <div>
          <ul>
            {banList.map((item, index) => (
              <button key={index}>{item}</button>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
