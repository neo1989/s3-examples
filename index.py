# -*- coding: utf-8 -*-

import os
import json
import yaml

from flask import Flask, request, redirect
from flask import render_template
from werkzeug.utils import secure_filename
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import sessionmaker


from s3sdk import Pys3sdk


app = Flask(__name__)

engine = create_engine("sqlite:///demo.db", echo=False)
Base = declarative_base()


class Image(Base):
    __tablename__ = "image"

    __table_args__ = {
        'mysql_engine': 'InnoDB',
        'mysql_charset': 'utf8'
    }

    id = Column(Integer, primary_key=True)
    url = Column(String(100))

    def __init__(self, url):
        self.url = url

    def __repr__(self):
        return "<Image(%d)('%s')>" % (self.id, self.url)

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()


@app.route("/", methods=["GET"])
def index():
    return render_template('index.html')


@app.route("/images", methods=['GET'])
def images():
    results = session.query(Image).order_by(-Image.id).all()
    return json.dumps([{"id": r.id, "url": r.url} for r in results], sort_keys=True)


@app.route("/image", methods=['POST'])
def image():

    with open('demo.yaml') as ymlDetail:
        x = yaml.load(ymlDetail)

        f = request.files['file']
        if f:
            filepath = os.path.join('/tmp/', secure_filename(f.filename))
            f.save(filepath)
            s3 = Pys3sdk(x["UPLOADURL"])
            s3.upload(filepath, 'images')
            res = json.loads(s3.response_data)
            if res["status"]:
                image = Image(res['url'])
                session.add(image)
                session.commit()

        return redirect('/')


if __name__ == '__main__':
    app.run(host="0")
