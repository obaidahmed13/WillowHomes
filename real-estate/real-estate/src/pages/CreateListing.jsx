import { useState } from "react"
import {getStorage} from 'firebase/storage';
import { getDownloadURL, ref, uploadBytesResumable, } from 'firebase/storage';
import {app} from '../firebase';

export default function CreateListing() {
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({
        imageUrls: [],
    })
    console.log(formData)
    const handleImageSubmit = () => {
        if (files.length > 0 && files.length<7) {
            const promises = [];
            for (let i=0; i< files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls)=>{
                setFormData({...formData, imageUrls: formData.imageUrls.concat(urls)});
            });
        }
    };
    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage(app);
          const fileName = new Date().getTime() + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      };
  return (
    <main className="p-3  max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-6">Create a Listing</h1>
        <form className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col gap-4 flex-1">
                <input type="text" placeholder="Name" className="border p-3 
                rounded-lg" id="name" maxLength='62' minLength='4' required/>
                <input type="text" placeholder="Description" className="border p-3 
                rounded-lg" id="description" required/>
                <input type="text" placeholder="Address" className="border p-3 
                rounded-lg" id="address" required/>
                <div className="flex gap-6 flex-wrap">
                <div className="flex gap-2">
                    <input type="checkbox" id="sale" className="w-5"/>
                    <span>Sell</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="rent" className="w-5"/>
                    <span>Rent</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="parking" className="w-5"/>
                    <span>Parking</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="furnished" className="w-5"/>
                    <span>Furnished</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="offer" className="w-5"/>
                    <span>Offer</span>
                </div>
                </div>
                <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                        <input type="number" id="bedrooms" min='1' max='10' required 
                        className="p-3 border border-gray-400 rounded-lg"
                        />
                        <p>Bedrooms</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" id="bathrooms" min='1' max='10' required 
                        className="p-3 border border-gray-400 rounded-lg"
                        />
                        <p>Baths</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" id="regularPrice" min='1' max= '10000' required 
                        className="p-3 border border-gray-400 rounded-lg"
                        />
                        <div>
                        <p>Regular Price</p>
                        <span className="text-xs">($ / month) </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" id="discountPrice" min='1' max= '10000' required 
                        className="p-3 border border-gray-400 rounded-lg"
                        />
                        <div className="flex flex-col items-center">
                        <p>Discounted Price</p>
                        <span className="text-xs">($ / month) </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
                <div className="flex">
                <p className="font-semibold">Images:</p>
                <span className="font-normal text-gray-600 ml-2">The first image will be the cover (max:6)</span>
                </div>
                <div className="flex gap-4">
                    <input onChange={(e)=> setFiles(e.target.files)} className="p-3 border border-gray-300 rounded w-full" type="file" id="images" accept='image/*' multiple />
                    <button type='button' onClick={handleImageSubmit} className="p-3 text-blue-700 border border-gray-500 rounded uppercase hover:shadow-lg">Upload</button>
                </div>
                <button className="p-3 bg-slate-600 text-white rounded-lg uppercase hover:opacity-80">Create Listing</button>
            </div>
            

        </form>
    </main>
  )
}

