import { DrupalService, getMenuDetails, getNewFooter, getNewHeader } from '@/lib/DrupalService';
import AirflowBuildingScreen from './screen';
import { DrupalNode } from 'next-drupal';
import { RawHeaderNode } from '@/types/header';
import { processMenuData } from '@/lib/processMenuData';

const CfdToolPage = async () => {
    const headerSection = (await getNewHeader()) as RawHeaderNode[];
    const MenuData = await getMenuDetails();
    const processedMenuItems = processMenuData(MenuData);

    const headerProps: any = {
        field_logo: headerSection[0]?.field_logo,
        field_header_menus_items: processedMenuItems,
    };

    const footerSection = await getNewFooter();
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
                headerData={headerProps}
                footerData={footerSection[0]}
            />
        </>
    );
};

export default CfdToolPage;