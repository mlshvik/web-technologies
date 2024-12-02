import { useSelector } from 'react-redux'

const useOrderSelector = () => {
	return useSelector(state => state.order)
}

export default useOrderSelector