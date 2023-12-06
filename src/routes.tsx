import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";
import Users from "views/users";
import { HiUsers } from "react-icons/hi2";
import { GrTransaction } from "react-icons/gr";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import AddUser from "./views/addUser";
import UserInformation from "./views/userInformation";
import Accounts from "./views/accounts";
import Transaction from "./views/transaction";
import AccountTransaction from "./views/accountTransaction";
import Loans from "./views/loans";
import RequestLoan from "./views/requestLoan";
import PayLoan from "./views/payLoan";
import LoansForApprove from "./views/loansForApprove";

var user = JSON.parse(localStorage.getItem("user") || "{}");

const routes =
  user?.role_code === "E"
    ? [
        {
          name: "Socios",
          layout: "/admin",
          path: "/users",
          icon: <HiUsers />,
          component: Users,
        },
        {
          name: "Agregar Socio",
          layout: "/admin",
          path: "/addUser",
          icon: <HiUsers />,
          hide: true,
          component: AddUser,
        },
        {
          name: "Información del socio",
          layout: "/admin",
          path: `/userInformation/:id`,
          icon: <HiUsers />,
          hide: true,
          component: UserInformation,
        },
        {
          name: "Cuentas",
          layout: "/admin",
          path: `/accounts/:id`,
          icon: <HiUsers />,
          hide: true,
          component: Accounts,
        },
        {
          name: "Transacción",
          layout: "/admin",
          path: `/transaction`,
          icon: <GrTransaction />,
          component: Transaction,
        },
        {
          name: "Estados de cuenta",
          layout: "/admin",
          path: `/accountTransaction`,
          icon: <GrTransaction />,
          component: AccountTransaction,
        },
        {
          name: "Prestamos",
          layout: "/admin",
          path: `/loans`,
          icon: <GrTransaction />,
          component: Loans,
        },
        {
          name: "Solicitar Prestamo",
          layout: "/admin",
          path: `/requestLoan/:id`,
          icon: <GrTransaction />,
          component: RequestLoan,
          hide: true,
        },
        {
          name: "Pagar prestamo",
          layout: "/admin",
          path: `/payLoan/:userId/:loanId`,
          icon: <GrTransaction />,
          component: PayLoan,
          hide: true,
        },
        // {
        // 	name: 'Main Dashboard',
        // 	layout: '/admin',
        // 	path: '/default',
        // 	icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
        // 	component: MainDashboard
        // },
        // {
        // 	name: 'NFT Marketplace',
        // 	layout: '/admin',
        // 	path: '/nft-marketplace',
        // 	icon: <Icon as={MdOutlineShoppingCart} width='20px' height='20px' color='inherit' />,
        // 	component: NFTMarketplace,
        // 	secondary: true
        // },
        // {
        // 	name: 'Data Tables',
        // 	layout: '/admin',
        // 	icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
        // 	path: '/data-tables',
        // 	component: DataTables
        // },
        // {
        // 	name: 'Profile',
        // 	layout: '/admin',
        // 	path: '/profile',
        // 	icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
        // 	component: Profile
        // },
        {
          name: "Sign In",
          layout: "/auth",
          path: "/sign-in",
          icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
          component: SignInCentered,
          hide: true,
        },
        // {
        // 	name: 'RTL Admin',
        // 	layout: '/rtl',
        // 	path: '/rtl-default',
        // 	icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
        // 	component: RTL
        // },
      ]
    : [
        {
          name: "Prestamos Solicitados",
          layout: "/admin",
          path: `/loansForApprove`,
          icon: <GrTransaction />,
          component: LoansForApprove,
        },
        // {
        // 	name: 'Main Dashboard',
        // 	layout: '/admin',
        // 	path: '/default',
        // 	icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
        // 	component: MainDashboard
        // },
        // {
        // 	name: 'NFT Marketplace',
        // 	layout: '/admin',
        // 	path: '/nft-marketplace',
        // 	icon: <Icon as={MdOutlineShoppingCart} width='20px' height='20px' color='inherit' />,
        // 	component: NFTMarketplace,
        // 	secondary: true
        // },
        // {
        // 	name: 'Data Tables',
        // 	layout: '/admin',
        // 	icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
        // 	path: '/data-tables',
        // 	component: DataTables
        // },
        // {
        // 	name: 'Profile',
        // 	layout: '/admin',
        // 	path: '/profile',
        // 	icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
        // 	component: Profile
        // },
        {
          name: "Sign In",
          layout: "/auth",
          path: "/sign-in",
          icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
          component: SignInCentered,
          hide: true,
        },
        // {
        // 	name: 'RTL Admin',
        // 	layout: '/rtl',
        // 	path: '/rtl-default',
        // 	icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
        // 	component: RTL
        // },
      ];

export default routes;
