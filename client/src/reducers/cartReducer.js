import Item1 from '../images/item1.jpg'
import Item2 from '../images/item2.jpg'
import Item3 from '../images/item3.jpg'
import Item4 from '../images/item4.jpg'
import Item5 from '../images/item5.jpg'
import Item6 from '../images/item6.jpg'
import { ADD_TO_CART, ADD_QUANTITY, SUB_QUANTITY, REMOVE_ITEM } from '../actions/action-types/cart-actions'

const initState = {
    items: [
        {
            id: 1,
            title: 'Italy',
            desc: "A wonderful tour in Italy",
            price: 110,
            img: Item1,
        },
        {
            id: 2,
            title: 'Vietnam',
            desc: "A wonderful tour in Vietnam",
            price: 80,
            img: Item2
        },
        {
            id: 3,
            title: 'France',
            desc: "A wonderful tour in France",
            price: 120,
            img: Item3
        },
        {
            id: 4,
            title: 'ThaiLan',
            desc: "A wonderful tour in ThaiLan",
            price: 260,
            img: Item4
        },
        {
            id: 5,
            title: 'China',
            desc: "A wonderful tour in China",
            price: 160,
            img: Item5
        },
        {
            id: 6,
            title: 'Lao',
            desc: "A wonderful tour in Lao",
            price: 90,
            img: Item6
        }
    ],
    addedItems: [],
    total: 0

}
const cartReducer = (state = initState, action) => {
    if (action.type === ADD_TO_CART) {
        let addedItem = state.items.find(item => item.id === action.id)

        //check if the action id exists in the addedItems
        let existed_item = state.addedItems.find(item => action.id === item.id)
        if (existed_item) {
            addedItem.quantity += 1
            return {
                ...state,
                //recalculating the total
                total: state.total + addedItem.price
            }
        }
        else {
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal
            }

        }
    } else if (action.type === ADD_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        addedItem.quantity += 1
        let newTotal = state.total + addedItem.price
        return {
            ...state,
            total: newTotal
        }
    } else if (action.type === SUB_QUANTITY) {
        let subtractedItem = state.items.find(item=> item.id === action.id)
        //if the quantity == 0 then the item should be removed
        if(subtractedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - subtractedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        } else {
            subtractedItem.quantity -= 1
            let newTotal = state.total - subtractedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
    } else if (action.type === REMOVE_ITEM) {
        let removedItem= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (removedItem.price * removedItem.quantity)
        console.log(removedItem)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    } else {
        return state
    }
}
export default cartReducer;