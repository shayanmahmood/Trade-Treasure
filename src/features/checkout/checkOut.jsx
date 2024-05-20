import useUser from "../authentication/hooks/useUser"
import { format } from "date-fns";
import useEmptyCart from "../cart/hooks/useEmptyCart";
function CheckOut() {
    const { cart } = useUser()
    const { emptyCart } = useEmptyCart()
    function handleSubit(e) {
        e.preventDefault()
        emptyCart()
    }

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

    function generateFiveDigitId() {
        return Math.floor(10000 + Math.random() * 90000);
    }
    return (
        <section className="flex flex-col justify-center antialiased bg-gray-200 text-gray-600 min-h-screen p-4">
            <div className="h-full">

                <div className="max-w-[360px] mx-auto">
                    <div className="bg-white shadow-lg rounded-lg mt-9">

                        <header className="text-center px-5 pb-5">
                            <div className="inline-flex -mt-9 w-[72px] h-[72px] fill-current rounded-full border-4 border-white box-content shadow mb-3" viewBox="0 0 72 72">
                                <img src='./img/logo.png' alt='logo' />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-1">Invoice from Trade & Treasure.</h3>
                            <div className="text-sm font-medium text-gray-500">Invoice #{generateFiveDigitId()}</div>
                        </header>
                        <div className="bg-gray-100 text-center px-5 py-6">
                            <div className="text-sm mb-6"><strong className="font-semibold">${finalCart.reduce((acc, cur) => {
                                return Math.round(acc + cur.product_price * cur.quantity
                                )
                            }, 0)}</strong> {format(new Date(), "EEE, MMM dd yyyy")}</div>
                            <form className="space-y-3" onSubmit={handleSubit}>
                                <div className="flex shadow-sm rounded">
                                    <div className="flex-grow">
                                        <input name="card-nr" className="text-sm text-gray-800 bg-white rounded-l leading-5 py-2 px-3 placeholder-gray-400 w-full border border-transparent focus:border-indigo-300 focus:ring-0" type="text" placeholder="Card Number" aria-label="Card Number" />
                                    </div>
                                    <div className="flex-none w-[4.8rem]">
                                        <input name="card-expiry" className="text-sm text-gray-800 bg-white leading-5 py-2 px-3 placeholder-gray-400 w-full border border-transparent focus:border-indigo-300 focus:ring-0" type="text" placeholder="MM/YY" aria-label="Expiration" />
                                    </div>
                                    <div className="flex-none w-[3.5rem]">
                                        <input name="card-cvc" className="text-sm text-gray-800 bg-white rounded-r leading-5 py-2 px-3 placeholder-gray-400 w-full border border-transparent focus:border-indigo-300 focus:ring-0" type="text" placeholder="CVC" aria-label="CVC" />
                                    </div>
                                </div>
                                <button type="submit" className="font-semibold text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2">Pay Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CheckOut
