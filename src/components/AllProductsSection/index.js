import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/products'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchData = await response.json()
      const updateData = fetchData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({productsList: updateData, isLoading: true})
    }
  }

  renderProductsList = () => {
    const {productsList, isLoading} = this.state
    return (
      <>
        {isLoading === false ? (
          <div data-testid="loader" className="loader-container">
            <Loader
              type="BallTriangle"
              color="#00BFFF"
              height={80}
              width={80}
            />
          </div>
        ) : (
          <div>
            <h1 className="products-list-heading">All Products</h1>
            <ul className="products-list">
              {productsList.map(product => (
                <ProductCard productData={product} key={product.id} />
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
