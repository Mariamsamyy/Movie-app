import React from 'react'
import Cover from '../components/Cover'
import DisplayContainer from '../components/DisplayContainer'
import { URLS } from '../modules/ApiLinks'

const TopRated = () => {
  return (
    <>
     <div>
            <Cover title={"Top Rated"}
                description={""}
                catchyPhrase="Discover the Best. Experience top-rated films that have captivated audiences worldwide."
                headerImage={""}
                showSearch={true}
                showHeaderImage={true}
            />
            <DisplayContainer 
                apiEndpoint={`${URLS.topRatedMovies}`}
                itemHeading={"Top Rated Movies"} 
                tvShowOn={true} moviesOn={true}
                numberOfMovies={5} />
        </div>
    </>
  )
}

export default TopRated