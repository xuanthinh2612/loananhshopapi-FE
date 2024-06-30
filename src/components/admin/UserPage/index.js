// function ProductManagement(props) {
//   const navigate = useNavigate();
//   const [isModalOpen, setModalOpen] = useState(false);

//   const isAdmin = isAdminUser();
//   const isAuth = isUserLoggedIn();

//   useEffect(() => {
//     // get product list
//     store.dispatch(getListProductByAdminAction());
//   }, []);

//   //   const handleEdit = (studentId) => {
//   //     navigate(`/edit-student/${studentId}`);
//   //   };

//   //   const handleDelete = async (studentId) => {
//   //     // await store.dispatch(deleteStudentByIdAction(studentId));
//   //   };

//   const { columns, rows } = useMemo(() => {
//     return projectsTableData({
//       productList: props.listProduct,
//       navigate: navigate,
//     });
//   }, [props.listProduct]);

//   if (props.error) {
//     return (
//       <div>
//         Opp! Some error Occured with status: {props.error.response.status} -{" "}
//         {props.error.message}
//       </div>
//     );
//   }

//   return (
//     <AdminLayout>
//       <Grid item xs={12}>
//         <Card>
//           <MDBox
//             mx={2}
//             mt={-3}
//             py={3}
//             px={2}
//             variant="gradient"
//             bgColor="info"
//             borderRadius="lg"
//             coloredShadow="info"
//           >
//             <MDTypography variant="h6" color="white">
//               Danh Sách Sản Phẩm
//             </MDTypography>
//           </MDBox>

//           {props.isLoading ? (
//             <MDBox
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//               p={3}
//             >
//               {SpinnerIcon}
//             </MDBox>
//           ) : (
//             <MDBox pt={3}>
//               <DataTable
//                 table={{ columns, rows }}
//                 isSorted={false}
//                 entriesPerPage={false}
//                 showTotalEntries={false}
//                 noEndBorder
//               />
//             </MDBox>
//           )}
//         </Card>
//       </Grid>

//       {/* <MDBox pt={6} pb={3}>
//           <Grid container spacing={6}>
//             <Grid item xs={12}>
//               <Card>
//                 <MDBox
//                   mx={2}
//                   mt={-3}
//                   py={3}
//                   px={2}
//                   variant="gradient"
//                   bgColor="info"
//                   borderRadius="lg"
//                   coloredShadow="info"
//                 >
//                   <MDTypography variant="h6" color="white">
//                     Danh Sách User
//                   </MDTypography>
//                 </MDBox>
//                 <MDBox pt={3}>
//                   <DataTable
//                     table={{ columns, rows }}
//                     isSorted={false}
//                     entriesPerPage={false}
//                     showTotalEntries={false}
//                     noEndBorder
//                   />
//                 </MDBox>
//               </Card>
//             </Grid>
//           </Grid>
//         </MDBox> */}

//       {/* {props.listProduct && props.listProduct.length > 0 ? (
//                 <>
//                   {props.listProduct.map((product) => {
//                     return (
//                       <tr key={product.id}>
//                         <th scope="row">{product.id}</th>
//                         <td>
//                           <Link
//                             className="text-decoration-none"
//                             to={`/product-detail/${product.id}`}
//                           >
//                             {product.namme}
//                           </Link>
//                         </td>
//                         {isAdmin && <td></td>}
//                       </tr>
//                     );
//                   })}
//                 </>
//               ) : (
//                 <tr className="text-center">
//                   <td colSpan={7}>No Data To Show.</td>
//                 </tr>
//               )} */}
//     </AdminLayout>
//   );
// }
