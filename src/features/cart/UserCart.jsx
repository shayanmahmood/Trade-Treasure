import useUser from "../authentication/hooks/useUser"



function UserCart() {
    const { cart } = useUser()

    function combineQuantities(cart) {
        let combinedCart = [];

        cart.forEach(product => {
            let existingProduct = combinedCart.find(p => p.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                combinedCart.push({ ...product });
            }
        });

        return combinedCart;
    }

    console.log(combineQuantities(cart))
    return (
        <div class="container mx-auto px-4 sm:px-8">
            <div class="py-8">
                <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div
                        class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                    >
                        <table class="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Product / Photo
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Amount
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => {
                                    return <tr>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div class="flex">
                                                <div class="flex-shrink-0 w-10 h-10">
                                                    <img
                                                        class="w-full h-full rounded-full"
                                                        src={item.img}
                                                        alt={item.product_name}
                                                    />
                                                </div>
                                                <div class="ml-3">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        Trade & Treasure
                                                    </p>
                                                    <p class="text-gray-600 whitespace-no-wrap">{item.product_name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p class="text-gray-900 whitespace-no-wrap">${item.product_price}</p>
                                            <p class="text-gray-600 whitespace-no-wrap">USD</p>
                                        </td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p class="text-gray-900 whitespace-no-wrap">Sept 28, 2019</p>
                                            <p class="text-gray-600 whitespace-no-wrap">Due in 3 days</p>
                                        </td>

                                    </tr>

                                })}
                            </tbody>
                        </table>
                        <table class="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total Amount:</th>
                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-green-500 text-left text-xs font-semibold text-white uppercase tracking-wider">${cart.reduce((acc, cur) => {
                                        return Math.round(acc + cur.product_price)
                                    }, 0)}</th>
                                </tr>

                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCart
