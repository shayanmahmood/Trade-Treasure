import { format, formatDistance } from "date-fns";
import useUser from "../authentication/hooks/useUser"
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Button from "../../components/Buttons/Button";

function UserCart() {
    const { cart } = useUser()

    function combineQuantities(cart) {
        let combinedCart = [];

        cart.forEach(product => {
            // Default quantity to 1 if not present
            let quantity = product.quantity || 1;

            let existingProduct = combinedCart.find(p => p.id === product.id);
            if (existingProduct) {
                // Ensure both quantities are numbers before adding
                existingProduct.quantity = (existingProduct.quantity || 0) + quantity;
            } else {
                // Initialize the quantity properly
                combinedCart.push({ ...product, quantity: quantity });
            }
        });

        return combinedCart;
    }


    let finalCart = combineQuantities(cart)

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div
                        className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                    >
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Product / Photo
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Amount
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Qty
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {finalCart.map((item) => {
                                    return <tr>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img
                                                        className="w-full h-full rounded-full"
                                                        src={item.img}
                                                        alt={item.product_name}
                                                    />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        Trade & Treasure
                                                    </p>
                                                    <p className="text-gray-600 whitespace-no-wrap">{item.product_name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">${item.product_price} X {item.quantity} = ${item.product_price * item.quantity} </p>
                                            <p className="text-gray-600 whitespace-no-wrap">USD</p>
                                        </td>
                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>

                                            <p className="text-gray-600 whitespace-no-wrap"><LocalMallIcon fontSize="small" />  X {item.quantity}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{format(new Date(item.created_at), "EEE, MMM dd yyyy")}</p>
                                            <p className="text-gray-600 whitespace-no-wrap">{formatDistance(format(new Date(item.created_at), "EEE, MMM dd yyyy"), format(new Date(), "EEE, MMM dd yyyy"))}</p>
                                        </td>
                                    </tr>

                                })}
                            </tbody>
                        </table>
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total Amount:</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-green-500 text-left text-xs font-semibold text-white uppercase tracking-wider">${cart.reduce((acc, cur) => {
                                        return Math.round(acc + cur.product_price)
                                    }, 0)} </th>
                                </tr>

                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <Button first="Pay The" title='Bill'  path='/payBill'/> 
        </div>
    )
}

export default UserCart
