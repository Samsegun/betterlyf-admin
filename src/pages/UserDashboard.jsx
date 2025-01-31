import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function UserDashboard() {
    return (
        <>
            <Row type='horizontal'>
                <Heading as='h1'>My Dashboard</Heading>
                <DashboardFilter />
            </Row>

            <DashboardLayout />
        </>
    );
}

export default UserDashboard;
