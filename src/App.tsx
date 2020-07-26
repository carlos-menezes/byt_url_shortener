import React, { useEffect, useState } from 'react';
import { redirectHost, isValidURL, buildShortURL } from './utils/urls';
import FirebaseService from './services/firebase';

import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import { H1, Paragraph3 } from 'baseui/typography';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { Spinner } from 'baseui/spinner';
import { StyledLink } from 'baseui/link';

// Components
import Wrapper from './components/Wrapper';

const App: React.FC = () => {
  let slug = window.location.href.split('/').slice(3, 4).toString(); // https://site.com/[slug];

  const [url, setUrl] = useState('');
  const [validUrl, setValidURL] = useState(false);
  const [returnedShortlink, setRS] = useState('');

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    const validateUrl = isValidURL(inputValue);

    setValidURL(validateUrl);
    setUrl(inputValue);
  }

  const handleInputSubmit = async () => {
    const id = await FirebaseService.pushData(url);
    setRS(id);
  }

  useEffect(() => {
    const processSlug = async () => {
      const findRecord = await FirebaseService.findById(slug);
      if (!findRecord) {
        window.location.href = redirectHost(window); // If there's no record of the slug, 
      } else {
        window.location.href = await FirebaseService.getURLById(slug);
      }
    }

    if (slug.length > 0) processSlug(); // no need to process an empty slug i.e. https://site.com/
  });

  return (
    <Wrapper>
      { slug.length !== 0
        ? <Spinner color="#000" />
        : 
          <React.Fragment>
            <div style={{
              width: '100%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0
            }}>
              <Grid behavior={BEHAVIOR.fixed} overrides={{Grid:{style:{padding: 0, margin: 0, width: '100%', display: 'flex', justifyContent: 'center'}}}}>
                <Cell span={12}>
                  <H1>
                    byt
                  </H1>
                </Cell>
                <Cell span={6}>
                  <Input
                    placeholder={'Insert URL to shorten...'}
                    type={'text'}
                    clearable={true}
                    error={(url.length > 0) && (validUrl === false)}
                    positive={(url.length > 0) && (validUrl === true)}
                    overrides={{ Input: { style: { fontFamily: 'monospace' } } }}
                    onChange={ (e) => handleInputChange(e)}/>
                </Cell>
                <Cell span={1}>
                  <Button disabled={!validUrl} onClick={() => handleInputSubmit()}>SUBMIT</Button>
                </Cell>
              </Grid>
            </div>
            
            <Grid behavior={BEHAVIOR.fixed} overrides={{Grid:{style:{padding: 0, margin: 0, width: '80%', display: 'flex', justifyContent: 'space-between'}}}}>
              <Cell span={12}>
                <Paragraph3 overrides={{ Block: {style: {height: '20px', verticalAlign: 'middle', textAlign: 'center', fontFamily: 'monospace' }} }}>
                  {
                    returnedShortlink.length > 0 &&
                    <span className={'.fade-in'}>Created <StyledLink href={buildShortURL(returnedShortlink)}>{buildShortURL(returnedShortlink)}</StyledLink></span>
                  }
                </Paragraph3>
              </Cell>
            </Grid>
          </React.Fragment>
      }
    </Wrapper>
  );
}

export default App;