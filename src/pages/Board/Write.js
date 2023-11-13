import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Write.module.css';
import axios from 'axios';
import ReactQuill from './ReactQuill';
import { LoginContext } from '../../App';
import { MemberContext } from '../Groovy/Groovy';

function Write() {
  const { member } = useContext(MemberContext);

  const [board, setBoard] = useState({ seq: "", title: "", writer: "", contents: "", file: "", view_count: "", category: "", write_date: "", dept: "" });
  const [file, setFile] = useState(null);
  const navi = useNavigate();
  const { loginID } = useContext(LoginContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBoard(prev => ({ ...prev, [name]: value }));
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleAdd = (isTemp) => {
    if (isTemp) {
    } else {
      const formData = new FormData();
      formData.append('writer', loginID);
      formData.append('title', board.title);
      formData.append('contents', board.contents);
      formData.append('category', board.category);
      formData.append('dept', member.group_name);

      if (file) {
        formData.append('files', file);
      }

      if (board.comDept === 'com') {
        axios.post('/api/boards', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(resp => {
            navi('/groovy/board');
            console.log(resp.data);
          })
          .catch(e => {
            console.error(e);
          });
      } else if (board.comDept === 'dept') {
        axios.post('/api/boards/dept', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(resp => {
            navi('/groovy/board');
            console.log(resp.data);
          })
          .catch(e => {
            console.error(e);
          });
      }
    }
  }

  return (
    <div className="boardContainer">
      <div className={style.write}>글쓰기</div>
      <hr></hr>
      <div className={style.margin}>
        제목
        <input type="text" placeholder="제목" name="title" onChange={handleChange} value={board.title} className={style.title} /><br />
        <hr></hr>
        파일 첨부
        <input type="file" onChange={handleFileChange} className={style.file} /><br />
        <hr></hr>
        전사/부서
        <select name="comDept" onChange={handleChange} value={board.comDept} className={style.category}>
          <option value="">선택</option>
          <option value="com">전사</option>
          <option value="dept">부서</option>
        </select>
        <hr></hr>
        공지/자유
        <select name="category" onChange={handleChange} value={board.category} className={style.category}>
          <option value="">선택</option>
          <option value="공지">공지</option>
          <option value="자유">자유</option>
        </select>
      </div>
      <hr></hr>
      <div className={style.editor}>
        <ReactQuill
          id="editor"
          value={board.contents}
          setValue={(value) => setBoard({ ...board, contents: value })}
        />
      </div>
      <hr></hr>
      <div className={style.btn}>
        <button onClick={() => handleAdd(true)}>임시저장</button>
        <button onClick={() => handleAdd(false)}>등록</button>
      </div>
    </div>
  );
}

export default Write;
