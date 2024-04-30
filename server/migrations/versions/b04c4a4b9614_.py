"""empty message

Revision ID: b04c4a4b9614
Revises: 72e0d6f3d92d
Create Date: 2024-04-25 18:03:29.587105

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b04c4a4b9614'
down_revision = '72e0d6f3d92d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('teetimes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date', sa.Date(), nullable=False))
        batch_op.add_column(sa.Column('time', sa.Time(), nullable=False))
        batch_op.drop_column('start_time')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('teetimes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('start_time', sa.DATETIME(), nullable=False))
        batch_op.drop_column('time')
        batch_op.drop_column('date')

    # ### end Alembic commands ###