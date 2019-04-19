import React, { Component } from 'react';

import ProductHero from './modules/views/ProductHero';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';

function Index() {
    return (
      <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductHowItWorks />
    </React.Fragment>
    );
}

export default withRoot(Index);
