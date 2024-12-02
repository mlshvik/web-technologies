import { useSelector } from 'react-redux'

const useCartSelector = () => {
	return useSelector(state => state.cart)
}

export default useCartSelector