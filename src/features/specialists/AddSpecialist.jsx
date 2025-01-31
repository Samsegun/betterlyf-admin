import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateSpecialistForm from "./CreateSpecialistForm";

function AddSpecialist() {
    return (
        <div>
            <Modal>
                <Modal.Open opens='specialist-form'>
                    <Button>Add new specialist</Button>
                </Modal.Open>
                <Modal.Window name='specialist-form'>
                    <CreateSpecialistForm />
                </Modal.Window>
            </Modal>
        </div>
    );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddSpecialist;
