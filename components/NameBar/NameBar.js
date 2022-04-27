import { RightOutlined } from "@ant-design/icons";
import React from "react";
import s from "../../styles/NameBar.module.scss";

import Link from "next/link";

const NameBar = ({ name, isView }) => {
  return (
    <div className={s.nameBarContainer}>
      <div className={s.nameBarLeft}>
        <div className={s.nameBarFirst}>/</div>
        <div className={s.nameBarSecond}>/</div>
        <div className={s.nameBarThird}>{name}</div>
      </div>
      {isView ? (
        <div className={s.nameBarRight}>
          <Link href="/blog">
            <a>
              View All
              <RightOutlined
                style={{ fontSize: "12px", alignSelf: "center" }}
              />
            </a>
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NameBar;
