import React from 'react'
import Cover from '../components/Cover'
import DisplayContainer from '../components/DisplayContainer'
import { API_KEY, URLS } from "../modules/ApiLinks";

const showProps = {
    numberOfMovies: 6, 
    showButtons: true,
}

const Home = () => {
    return (
        <div>
            <Cover title={"Welcome"}
                description={"Free Movies to Watch, Anytime Anywhere."}
                catchyPhrase="The search is over! Let Plex help you find the perfect movie to watch tonight for free"
                headerImage={""}
                showSearch={true}
                showHeaderImage={true}
            />
            <DisplayContainer
                apiEndpoint={`${URLS.upcoming}?api_key=${API_KEY}`}
                itemHeading={"Upcoming Movies"}
                tvShowOn={false}
                moviesOn={true}
                {...showProps} />

            <DisplayContainer
                apiEndpoint={`${URLS.popular}?api_key=${API_KEY}`}
                itemHeading={"Popular Movies"}
                tvShowOn={false}
                moviesOn={true}
                {...showProps} />
        </div>
    )
}

export default Home;
