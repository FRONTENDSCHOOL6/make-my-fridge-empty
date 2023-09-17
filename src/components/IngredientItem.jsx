import { getPbImageURL } from "@/utils/getPbImageURL"
import pb from '@/api/pocketbase';
import { useState, useEffect } from 'react'

function IngredientItem() {

  // 재료 전체 정보
  const [ingredientInfo, setingredientInfo] = useState([]);

  useEffect(() => {
    async function fetchInfoList() {
      try {
        const infoList = await pb.collection('ingredients').getFullList();
        setingredientInfo(infoList)
        console.log(ingredientInfo)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchInfoList();
  }, []);

  return(
    <>
    <div className="flex gap-1 flex-wrap justify-center">
      {ingredientInfo.map((ingredient) => (
        <div
          key={ingredient.id}
          className="w-[55px] h-[74px]">
            <img
              src={getPbImageURL(ingredient, 'photo')}
              alt={ingredient.name}
            />
          <div
            className="font-nanum w-auto h-4 mt-1 -bg--fridge-bg-gray rounded-md text-center text-xs overflow-hidden"
          >
            {ingredient.name}
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default IngredientItem