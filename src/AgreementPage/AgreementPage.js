import React, {Component} from 'react'

const contentStyle = {
    marginLeft: '30px',
    marginRight: '30px'
  }

const headStyle = {
    marginTop: '15px',
    marginLeft: '15px',
    marginRight: '15px'
}

export default class AgreementPage extends Component {

	render() {
		return (
            <div>
                <div className="justify-content-center row" style={headStyle}>
					<h3>ກ່ຽວກັບໂຄງການ ແລະ ຂໍ້ຕົກລົງ</h3>
				</div>
                <div  style={contentStyle}>
                    <div>
                    <h4>ກ່ຽວກັບໂຄງການ</h4>
                        <p> <b>Lao Speech Recognize</b> ຫລືຊື່ພາສາລາວ <b>ລະບົບຮັບຮູ້ສຽງເວົ້າພາສາລາວ</b> ເປັນໂຄງການວິທະຍານິພົນຂອງນັກສຶກສາປະລິນຍາຕີ 
                            ສາຂາ ວິສະວະກຳຄອມພິວເຕີ. ເຊິ່ງລະບົບນີ້ແມ່ນລະບົບທີ່ນຳໃຊ້ເທັກໂນໂລຍີ Machine Learning ເພື່ອວິເຄາະສຽງເວົ້າພາສາລາວ ແລ້ວຫາຂໍ້ຄວາມພາສາລາວ 
                            ທີ່ກົງກັບສຽງນັ້ນ ໂດຍລະບົບຕອນນີ້ເປັນການວິເຄາະຄຳເວົ້າຕົວເລກ ຫນຶ່ງ ຫາ ສິບ.</p>
                    </div>

                    <div>
                        <h4>ຂໍ້ຕົກລົງ</h4>
                        <p>1. ເມື່ອທ່ານກົດບັນທຶກສຽງ ແລະ ກົດສຳເລັດຖືວ່າ ທ່ານໄດ້ຍອມຮັບຂໍ້ຕົກລົງເຫລົ່ານີ້ແລ້ວ</p>
                        <p>2. ທ່ານຍິນຍອມອະນຸຍາດໃຫ້ເຂົ້າເຖິງການໃຊ້ງານ ໄມໂຄໂຟນ ອຸປະກອນຂອງທ່ານ</p>
                        <p>2. ທ່ານໄດ້ຍິນຍອມໃຫ້ນຳຄລິບສຽງຂອງທ່ານ ໄປໃຊ້ໃນການຄົ້ນຄວ້າວິໄຈ ແລະ ພັດທະນາກ່ຽວກັບລະບົບຄອມພິວເຕີ</p>
                    </div>
                </div>
            </div>
        )
	}
}