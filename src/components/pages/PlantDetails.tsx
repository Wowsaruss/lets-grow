import { useParams } from "react-router-dom";
import PageHeader from "../PageHeader"
import PageWrapper from "../PageWrapper"

const PlantDetails = () => {
    const params: Record<string, any> = useParams();

    return (
        <PageWrapper header={<PageHeader title={params.plantId} />}>
            PLANT DETAIL
        </PageWrapper>
    )
}

export default PlantDetails