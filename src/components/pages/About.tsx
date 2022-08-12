import React from 'react'
import PageWrapper from '../PageWrapper'

const About = () => (
    <PageWrapper
        header={
            <div
                style={{
                    // position: 'fixed',
                    height: 70,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%',
                    boxShadow: '-5px 4px 10px #f2f2f2',
                    paddingLeft: 25,
                }}
            >
                <h1>About</h1>
            </div>
        }
    >
        <h3>Not sure what goes here yet!</h3>
    </PageWrapper>
)

export default About
