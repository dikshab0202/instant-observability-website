import { Button, Icon, Link, useTessen } from '@newrelic/gatsby-theme-newrelic';
import { QUICKSTARTS_REPO, SHIELD_LEVELS } from '../data/constants';
import React, { useEffect, useState } from 'react';

import Breadcrumbs from '../components/Breadcrumbs';
import IOSeo from '../components/IOSeo';
import InstallButton from '../components/InstallButton';
import PageLayout from '../components/PageLayout';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { graphql } from 'gatsby';
import { quickstart } from '../types';
import QuickstartHowToUse from '../components/QuickstartHowToUse';
import LandingPageFooter from '../components/LandingPageFooter';
import Dashboards from '../components/WhatsIncluded/Dashboards';
import Alerts from '../components/WhatsIncluded/Alerts';
import DataSources from '../components/WhatsIncluded/DataSources';
import Layout from '../components/Layout';
import QuickstartOverview from '../components/QuickstartOverview';
import LandingBanner from '../components/LandingBanner';

const layoutContentSpacing = css`
  --page-margin: 156px;
  @media (max-width: 760px) {
    --page-margin: 30px;
  }
  padding: 0 var(--page-margin);
`;

const QuickstartDetails = ({ data, location }) => {
  const [imgStyle, setImgStyle] = useState({});

  const quickstart = data.quickstarts;
  const quickstartUrl = quickstart.packUrl || QUICKSTARTS_REPO;
  const tessen = useTessen();
  const breadcrumbs = [
    {
      name: 'Instant Observability (I/O)',
      url: '/',
    },
    {
      name: quickstart.title,
    },
  ];
  const quickStartMeta = [
    {
      name: 'quick_start_name',
      class: 'swiftype',
      'data-type': 'string',
      content: quickstart.title,
    },
  ];

  const trackQuickstart = (action, quickstart) => () =>
    tessen.track({
      eventName: 'instantObservability',
      category: action,
      quickstartName: quickstart.name,
      quickstartId: quickstart.id,
      quickstartUrl: quickstart.packUrl,
    });

  const tessenSupportTrack = (quickstart) => (action) => {
    tessen.track({
      eventName: 'instantObservability',
      category: action,
      quickstartName: quickstart.name,
      quickstartId: quickstart.id,
    });
  };

  // get image resolution from URL
  const getURLMeta = async (url) => {
    const img = new Image();
    img.src = url;
    const { width, height } = await new Promise((resolve) => {
      img.onload = function () {
        resolve({
          width: this.width,
          height: this.height,
        });
      };
    });
    return { width, height };
  };

  const getImgStyle = async () => {
    const { width, height } = await getURLMeta(quickstart.logoUrl);
    const style = {};
    // if image is rectangle
    if (width > height) {
      style.width = '';
      style.height = '';
    } else {
      style.width = '80px';
      style.height = '80px';
    }
    setImgStyle(style);
  };

  useEffect(() => {
    getImgStyle();
  }, [quickstart.logoUrl]);

  return (
    <>
      <IOSeo
        title={quickstart.title}
        type="quickstarts"
        location={location}
        tags={quickstart.keywords}
        meta={quickStartMeta}
      />
      <PageLayout.Header
        css={css`
          --banner-height: 430px;
          --page-margin: 156px;
          @media (max-width: 760px) {
            --banner-height: 420px;
            --page-margin: 30px;
          }

          font-family: 'Söhne-Buch';
          height: var(--banner-height);
        `}
      >
        <LandingBanner
          css={css`
            margin: 0 var(--page-margin);
          `}
          quickstart={quickstart}
        />
      </PageLayout.Header>

      <Layout.Content>
        {/* What's included section here */}
        <div
          css={css`
            ${layoutContentSpacing};
            > * {
              padding-top: 3rem;
            }
          `}
        >
          <Dashboards quickstart={quickstart} />
          <Alerts quickstart={quickstart} />
          <DataSources quickstart={quickstart} />
        </div>
        <div
          css={css`
            margin-top: 80px;
            margin-bottom: 80px;
            mix-blend-mode: normal;
            width: 50%;
            opacity: 0.84;
            border: 5px solid #e8e8e8;
            border-radius: 5px;
            transform: rotate(180deg);

            @media (max-width: 760px) {
              width: 100%;
            }
          `}
        ></div>
        <div
          css={css`
            ${layoutContentSpacing};

            padding-bottom: 117px;
            @media screen and (max-width: 760px) {
              padding-bottom: 40px;
            }
          `}
        >
          <QuickstartOverview quickstart={quickstart} />
        </div>
        {/* How to use this quickstart here */}
        <div
          css={css`
            ${layoutContentSpacing};

            background-color: #f1f2f2;
            padding-top: 30px;
            padding-bottom: 30px;
          `}
        >
          <QuickstartHowToUse
            quickstart={quickstart}
            trackQuickstart={trackQuickstart}
            location={location}
          />
        </div>
        {/* Get started component here */}
        <div
          css={css`
            ${layoutContentSpacing};

            padding-top: 30px;
            padding-bottom: 30px;
          `}
        >
          <LandingPageFooter
            quickstart={quickstart}
            trackQuickstart={trackQuickstart}
            tessenSupportTrack={tessenSupportTrack}
          />
        </div>
      </Layout.Content>
    </>
  );
};

QuickstartDetails.propTypes = {
  data: PropTypes.shape({
    quickstarts: quickstart,
  }),
  location: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query($id: String!) {
    quickstarts(id: { eq: $id }) {
      name
      title
      relatedResources(limit: 5) {
        title
        url
      }
      level
      keywords
      id
      description
      summary
      logoUrl
      packUrl
      dashboards {
        description
        name
        screenshots
      }
      alerts {
        details
        name
        type
      }
      documentation {
        name
        url
        description
      }
      authors
      installPlans {
        id
        name
      }
    }
  }
`;

export default QuickstartDetails;
