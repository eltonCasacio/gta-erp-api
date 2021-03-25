/*
 *
 * HomePage
 *
 */
/* eslint-disable */
import React, { memo, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { get, upperFirst } from "lodash";
import { auth, LoadingIndicatorPage } from "strapi-helper-plugin";
import PageTitle from "../../components/PageTitle";
import { useModels } from "../../hooks";

import useFetch from "./hooks";
import { Block, Container, P, Wave, Smile } from "./components";

const HomePage = ({ history: { push } }) => {
  const { error, isLoading, posts } = useFetch();
  // Temporary until we develop the menu API
  const {
    collectionTypes,
    singleTypes,
    isLoading: isLoadingForModels,
  } = useModels();

  const handleClick = (e) => {
    e.preventDefault();

    push(
      "/plugins/content-type-builder/content-types/plugins::users-permissions.user?modalType=contentType&kind=collectionType&actionType=create&settingType=base&forTarget=contentType&headerId=content-type-builder.modalForm.contentType.header-create&header_icon_isCustom_1=false&header_icon_name_1=contentType&header_label_1=null"
    );
  };

  const hasAlreadyCreatedContentTypes = useMemo(() => {
    const filterContentTypes = (contentTypes) =>
      contentTypes.filter((c) => c.isDisplayed);

    return (
      filterContentTypes(collectionTypes).length > 1 ||
      filterContentTypes(singleTypes).length > 0
    );
  }, [collectionTypes, singleTypes]);

  if (isLoadingForModels) {
    return <LoadingIndicatorPage />;
  }

  const headerId = hasAlreadyCreatedContentTypes
    ? "HomePage.greetings"
    : "app.components.HomePage.welcome";
  const username = get(auth.getUserInfo(), "firstname", "");
  const linkProps = hasAlreadyCreatedContentTypes
    ? {
        id: "app.components.HomePage.button.blog",
        href: "https://strapi.io/blog/",
        onClick: () => {},
        type: "blog",
        target: "_blank",
      }
    : {
        id: "app.components.HomePage.create",
        href: "",
        onClick: handleClick,
        type: "documentation",
      };

  return (
    <>
      <FormattedMessage id="HomePage.helmet.title">
        {(title) => <PageTitle title={title} />}
      </FormattedMessage>
      <Container className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Block>
              <Wave />
              <FormattedMessage
                id={headerId}
                values={{
                  name: upperFirst(username),
                }}
              >
                {(msg) => <h2 id="mainHeader">Olá</h2>}
              </FormattedMessage>
              {hasAlreadyCreatedContentTypes && (
                <FormattedMessage id="app.components.HomePage.welcomeBlock.content.again">
                  {(msg) => (
                    <P>
                      Através desse sistema você é capaz de disponibilizar
                      documentos aos seus funcionários.
                      <br />
                      Alem de gerenciar o apontamento de horas de cada um.
                      <br />
                      <br />
                      Mas pode ser feito muito mais!
                      <br />
                      Pode gerenciar férias
                      <br />
                      Gerar relatórios
                      <br />
                      Criar diversos tipos de alerta e envios de mensagens para
                      seu celular ou email
                      <br />
                      E outras diversas funcionalidades
                      <br />
                      <br />
                      <b>Gostou da ideia?</b>
                      <br />
                      Entre em contato com a C3RInnovation e agende uma reunião
                      sem compromisso, vamos trocar ideias e elaborar um sistema
                      que agregue valor.
                      <Smile />
                    </P>
                  )}
                </FormattedMessage>
              )}
            </Block>
          </div>
        </div>
      </Container>
    </>
  );
};

export default memo(HomePage);
