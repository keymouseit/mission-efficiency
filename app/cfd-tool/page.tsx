import { DrupalService } from '@/lib/DrupalService';
import AirflowBuildingScreen from './screen';
import { DrupalNode } from 'next-drupal';

const CfdToolPage = async () => {
    const headerSection = await DrupalService.getHeaderSection();
    const footerSection = await DrupalService.getFooterSection();
    const data = await DrupalService.getCfdToolPage();
    const allCards = await DrupalService.getAllCards();
    let newAbcfdCard: DrupalNode[] = [];
    let newthroughCard: DrupalNode[] = [];
    let newSupportCard: DrupalNode[] = [];
    let newAbcdCards: DrupalNode[] = [];

    data[0].field_afb_illustration_cards.forEach((AbCards: DrupalNode) => {
        const matchedCard = allCards.find((card) => card.id === AbCards.id);

        if (matchedCard) {
            newAbcfdCard.push(matchedCard);
        }
    });
    data[0].field_afb_does_through_cards.forEach((throughCard: DrupalNode) => {
        const matchedThroughCards = allCards.find((card) => card.id === throughCard.id);

        if (matchedThroughCards) {
            newthroughCard.push(matchedThroughCards);
        }
    });
    data[0].field_afb_design_support_cards.forEach((supportCard: DrupalNode) => {
        const matchedSupportCards = allCards.find((card) => card.id === supportCard.id);

        if (matchedSupportCards) {
            newSupportCard.push(matchedSupportCards);
        }
    });
    data[0].field_afb_abcfd_cards.forEach((abcCard: DrupalNode) => {
        const matchedAbcCards = allCards.find((card) => card.id === abcCard.id);

        if (matchedAbcCards) {
            newAbcdCards.push(matchedAbcCards);
        }
    });


    const airflowBuildingData = {
        ...data[0],
        field_afb_illustration_cards: newAbcfdCard,
        field_afb_does_through_cards: newthroughCard,
        field_afb_design_support_cards: newSupportCard,
        field_afb_abcfd_cards: newAbcdCards,
    };

    return (
        <>
            <AirflowBuildingScreen
                data={airflowBuildingData}
                headerData={headerSection[0]}
                footerData={footerSection[0]}
            />
        </>
    );
};

export default CfdToolPage;